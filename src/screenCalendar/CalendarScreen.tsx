import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import Item from './components/Item';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AgendaItem = {
  name: string;
  time: string;
  endroit: string;
};

const Calendar: React.FC = () => {
  const [items, setItems] = useState<{ [key: string]: AgendaItem[] }>({});
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);



  const getMonthYear = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); 
  };

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString); 
  };

  const renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Pas de Médicaments à prendre Aujourd'hui</Text>
      </View>
    );
  };

  // Locale configuration
  LocaleConfig.locales['fr'] = {
    monthNames: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 
      'Octobre', 'Novembre', 'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 
                     'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui"
  };
  LocaleConfig.defaultLocale = 'fr';

  // Calendar theme
  const customTheme = {
    backgroundColor: '#F4F5F6',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#0073C5',
    selectedDayBackgroundColor: '#0073C5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#FF5733',
    dayTextColor: '#292F35',
    arrowColor: 'orange',
    monthTextColor: '#000000',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.month}>{getMonthYear(selectedDate)}</Text>
      </View>
      <View style={styles.calendar}>
        <Agenda
          items={items}
          renderItem={Item}
          showOnlySelectedDayItems={true}
          pastScrollRange={12}
          futureScrollRange={12}
          selected={selectedDate}
          onDayPress={handleDayPress}
          renderEmptyData={renderEmptyData}
          theme={customTheme}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  month: {
    fontSize: 22,
    fontWeight: 'semibold',
    color: '#292F35',
  },
  calendar: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

export default Calendar;
