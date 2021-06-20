import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

import BackButton from '../../components/BackButton';
import Car from '../../components/Car';
import Loading from '../../components/Loading';

import api from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantility,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

const MyCars: React.FC = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const { navigate, goBack } = useNavigation();
  const theme = useTheme();

  const handleBack = () => {
    goBack();
  };

  useEffect(() => {
    api
      .get('/schedules_byuser/?user_id=1')
      .then((res) => setCars(res.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Lista de {'\n'}
          Carros que{'\n'}
          você alugou
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      {loading ? (
        <Loading />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantility>{cars.length}</AppointmentsQuantility>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />

                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
};

export default MyCars;
