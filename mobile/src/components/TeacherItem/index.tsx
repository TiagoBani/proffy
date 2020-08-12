import React from 'react';
import { Image, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles'

const TeacherItem: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profile} >
                <Image
                    style={styles.avatar}
                    source={{ uri: "https://avatars0.githubusercontent.com/u/3676633?s=460&u=ded5bb6cb58240237e19c9ab4f5ed5a2c57dee29&v=4" }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Tiago Bani</Text>
                    <Text style={styles.subject}>Matematica</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                Bio grafia do professor
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ 20,00</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, styles.favorited]}>
                        <Image source={unfavoriteIcon} />

                    </RectButton>
                    <RectButton style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>
                            Entrar em contato
                        </Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem