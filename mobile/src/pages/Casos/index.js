import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';

export default function Casos() {
    const [casos, setCasos] = useState([]);
    const [total, setTotal] = useState(0);  
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigationToDetail(caso) {
        navigation.navigate('Detail', { caso });
    }

    async function loadCasos() {
        if (loading) {
            return;
        }

        if (total > 0 && casos.length == total) {
            return;
        }

        setLoading(true);


        const response = await api.get('casos', {
            params: { page }
        });
        
        
        setCasos([...casos, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadCasos();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>


            <FlatList 
                style={styles.casosList}
                data={casos}
                keyExtractor={caso => String(caso.id)}
               // showsVerticalScrollIndicator={false}
                onEndReached={loadCasos}
                onEndReachedThreshold={0.2}
                renderItem={({ item: caso }) => (
                    <View style={styles.caso}>
                        <Text style={styles.casosProperty}>ONG:</Text>
                        <Text style={styles.casosValue}>{caso.name}</Text>

                        <Text style={styles.casosProperty}>CASO:</Text>
                        <Text style={styles.casosValue}>{caso.title}</Text>

                        <Text style={styles.casosProperty}>VALOR:</Text>
                        <Text style={styles.casosValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' })
                                .format(caso.value)}        
                        </Text>

                    <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigationToDetail(caso)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>

                    
                </View>
                )}
            />

        </View>
    );
}