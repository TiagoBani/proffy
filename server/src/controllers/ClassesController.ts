import { Request, Response } from 'express'

import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

interface Filter {
    week_day: string,
    subject: string,
    time: string
}

class ClassesController {
  async index (request: Request, response: Response) {
    const filters = request.query

    const { subject, week_day, time } = filters as unknown as Filter
    if (!subject || !week_day || !time) {
      response.status(400).json({
        message: 'missing filters to search classes'
      })
    }

    const timeInMinutes = convertHourToMinutes(time)

    const classes = await db('classes')
      .whereExists(function () {
        this.from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .andWhereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .andWhereRaw('`class_schedule`.`from` <= ??', [Number(timeInMinutes)])
          .andWhereRaw('`class_schedule`.`to` > ??', [Number(timeInMinutes)])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')

    response.json(classes)
  }

  async store (request: Request, response: Response) {
    const { name, whatsapp, bio, avatar, subject, cost, schedule } = request.body

    const trx = await db.transaction()

    try {
      const [user_id] = await trx('users').insert({ name, whatsapp, bio, avatar })
      const [class_id] = await trx('classes').insert({ subject, cost, user_id })

      if (schedule) {
        schedule.map((scheduleItem: ScheduleItem) => {
          const from = convertHourToMinutes(scheduleItem.from)
          const to = convertHourToMinutes(scheduleItem.to)

          Object.assign(scheduleItem, { from, to, class_id })
        })

        await trx('class_schedule').insert(schedule)
      }

      await trx.commit()
      return response.status(201).json({ status: 'OK' })
    } catch (error) {
      await trx.rollback()
      return response.status(400).json({ message: 'Unexpected error while creating class' })
    }
  }
}

export default new ClassesController()
