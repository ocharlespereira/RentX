import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Calendar, { DayProps, MarkedDateProps } from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';

import ArrowSvg from '../../assets/arrow.svg';

import { CarDTO } from '../../dtos/carDTO';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface Params {
  car: CarDTO;
}

interface RentalPeriod {
  start: string;
  end: string;
}

const Scheduling: React.FC = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const { navigate, goBack } = useNavigation();
  const route = useRoute();

  const { car } = route.params as Params;

  const handleSchedulingDetails = () => {
    if (!rentalPeriod?.start || !rentalPeriod.end) {
      return Alert.alert('Selecione o intervalo para alugar.');
    }
    navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  };

  const handleBack = () => {
    goBack();
  };

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  };

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
          Escolha uma {'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod?.start}>
              {rentalPeriod?.start}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod?.end}>
              {rentalPeriod?.end}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleSchedulingDetails}
          enabled={!!rentalPeriod.start}
        />
      </Footer>
    </Container>
  );
};

export default Scheduling;
