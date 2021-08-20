import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../databases';
import api from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

import Car from '../../components/Car';
import LoadAnimation from '../../components/LoadAnimation';

import Logo from '../../assets/logo.svg';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

const Home: React.FC = () => {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const { navigate } = useNavigation();
  const netInfo = useNetInfo();

  const handleCarDetails = (car: CarDTO) => {
    navigate('CarDetails', { car });
  };

  const offlineSyncronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {},
      pushChanges: async ({ changes }) => {},
    });
  };

  useEffect(() => {
    let isMounted = true;
    api
      .get('/cars')
      .then((response) => {
        if (isMounted) {
          setCars(response.data);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
};

export default Home;
