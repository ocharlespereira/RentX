import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import api from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

import Car from '../../components/Car';
import Load from '../../components/Loading';

import Logo from '../../assets/logo.svg';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

const carData = {
  brand: 'Audi',
  name: 'RS 5 Coupé',
  rent: {
    period: 'AO DIA',
    price: 120,
  },
  thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
};

const Home: React.FC = () => {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car });
  };

  useEffect(() => {
    api
      .get('/cars')
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Load />
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
