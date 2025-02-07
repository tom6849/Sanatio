import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { useMedication } from './../context/MedicationContext';
import { Medication } from '../type/Medication';
import Medicaments from './components/Medicaments';

const Calendar: React.FC = () => {
  const { medications } = useMedication();
  const [items, setItems] = useState<{ [key: string]: Medication[] }>({});
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const medicationByDate: { [key: string]: Medication[] } = {};
    if (medications) {
      medications.forEach((med) => {
        med.date.forEach((elem) => {
          if (typeof elem.date === 'string' && typeof elem.taken === 'boolean') { 
            if (!medicationByDate[elem.date]) {
              medicationByDate[elem.date] = [];
            }
            medicationByDate[elem.date].push({
              ...med,
              date: med.date, 
            });
          }
        });
      });
    }
    setItems(medicationByDate);
  }, [medications]);

  const getMonthYear = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
  };

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const renderEmptyData = () => (
    <View style={styles.emptyContainer}>
      <Text>Pas de médicaments à prendre aujourd'hui</Text>
    </View>
  );

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
          renderItem={(item: Medication) => (
            <Medicaments medication={item} fromCalendar={true} calendarDate={selectedDate} />
          )}
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
    fontWeight: '600',
    color: '#292F35',
  },
  calendar: {
    flex: 1,
    backgroundColor: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Calendar;
