import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import Item from './components/Item';

// Définir un type pour les items de l'agenda
type AgendaItem = {
  name: string;
  time: string;
  comprime : number;
};

const Calendar: React.FC = () => {
  /**
   * Etat pour stocker les différents Item 
   */
  const [items, setItems] = useState<{ [key: string]: AgendaItem[] }>({
    '2024-12-11': [{ name: 'Dafalgan', time: '1:00 PM', comprime:1 }],
    '2024-12-12': [{ name: 'Dafalgan', time: '10:00 AM', comprime:1 },{ name: 'Dafalgan', time: '10:00 AM', comprime:3 },],
    '2024-12-13': [{ name: 'Dafalgan', time: '1:00 PM', comprime:1 }],
  });

  const [selectedDate, setSelectedDate] = useState<string>(Date());

  const getMonthYear = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', options); 
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); 
  };

  const handleDayPress = (day: { dateString: string }) => {
    console.log('Day pressed:', day.dateString);
    setSelectedDate(day.dateString); 
  };
  const renderEmptyData =() =>{
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Pas de Médicaments à prendre Aujourd'hui</Text>
      </View>
    )
  }

  /*
  * Passage du texte en  francais 
  *
  * 
  */
  LocaleConfig.locales['fr'] = {
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui"
  };
  LocaleConfig.defaultLocale = 'fr';

  
/*
  * constante représentant le theme du calendrier  
  *
  * 
  */
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
