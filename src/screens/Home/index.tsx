import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../databases';
import api from '../../services/api';
import { Car as ModelCar } from '../../databases/model/Car';
import { CarDTO } from '../../dtos/carDTO';

import Car from '../../components/Car';
import LoadAnimation from '../../components/LoadAnimation';

import Logo from '../../assets/logo.svg';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

const Home: React.FC = () => {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const { navigate } = useNavigation();
  const netInfo = useNetInfo();

  const handleCarDetails = (car: CarDTO) => {
    navigate('CarDetails', { car });
  };

  const offlineSyncronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, latestVersion } = response.data;
        // console.log('lastPulledAt', lastPulledAt);
        // console.log(
        //   'response',
        //   { changes, timestamp: latestVersion },
        //   'response2',
        //   response
        // );
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        console.log('UUUUUUUUUUUUUUUUUU', user);
        await api.post('/users/sync', user);
      },
      // migrationsEnabledAtVersion: 1,
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCars = async () => {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        console.log('CARRRRRRS', cars);

        if (isMounted) {
          setCars(cars);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSyncronize();
    }
  }, [netInfo.isConnected]);

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
