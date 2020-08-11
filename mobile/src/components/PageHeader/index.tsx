import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png'
import logoImg from '../../assets/images/logo.png'

import styles from './styles'


interface PageHeaderProps {
    tittle: string
}


const PageHeader: React.FC<PageHeaderProps> = ({ tittle, children }) => {

    const { navigate } = useNavigation();

    function handleGoBack() {
        navigate('Landing')
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton
                    onPress={handleGoBack}
                >
                    <Image source={backIcon} resizeMode="contain" />
                </BorderlessButton>

                <Image source={logoImg} resizeMode="contain" />
            </View>

            <Text style={styles.title}>{tittle}</Text>
            {children}
        </View>
    )
}

export default PageHeader