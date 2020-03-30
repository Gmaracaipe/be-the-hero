import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';


export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const caso = route.params.caso;
    const message = `Olá ${caso.name}, estou entrando em contato pois gostaria de ajudar no caso "${caso.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.value)}`;

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${caso.title}`,
            recipients: [caso.email],
            body: message,
        })
    }
    
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?text=${message}&phone=${caso.whatsapp}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.caso}>
                        <Text style={[styles.casosProperty, { marginTop: 0 }]}>ONG:</Text>
                        <Text style={styles.casosValue}>{caso.name} de {caso.city}/{caso.uf}</Text>

                        <Text style={styles.casosProperty}>CASO:</Text>
                        <Text style={styles.casosValue}>{caso.title}</Text>

                        <Text style={styles.casosProperty}>VALOR:</Text>
                        <Text style={styles.casosValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' })
                                .format(caso.value)}        
                        </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}