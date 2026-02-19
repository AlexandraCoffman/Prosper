import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../styles/colors";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}

const CalendarPicker = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [visibleMonth, setVisibleMonth] = useState(today.getMonth());
  const [visibleYear, setVisibleYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(visibleMonth, visibleYear);
  const firstDayOfMonth = getFirstDayOfMonth(visibleMonth, visibleYear);

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let date = 1; date <= daysInMonth; date++) {
    calendarDays.push(date);
  }
  while (calendarDays.length < 42) {
    calendarDays.push(null);
  }

  const handlePrevMonth = () => {
    if (visibleMonth === 0) {
      setVisibleMonth(11);
      setVisibleYear((y) => y - 1);
    } else {
      setVisibleMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (visibleMonth === 11) {
      setVisibleMonth(0);
      setVisibleYear((y) => y + 1);
    } else {
      setVisibleMonth((m) => m + 1);
    }
  };

  const handleSelectDate = (date: number | null) => {
    if (date) {
      setSelectedDate(new Date(visibleYear, visibleMonth, date));
    }
  };

  const monthLabel = new Date(visibleYear, visibleMonth).toLocaleString(
    "default",
    {
      month: "long",
      year: "numeric",
    },
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.arrow} accessibilityLabel="Previous Month">
            {"<"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.monthLabel}>{monthLabel}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.arrow} accessibilityLabel="Next Month">
            {">"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekRow}>
        {WEEKDAYS.map((day) => (
          <Text style={styles.weekday} key={day}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.datesGrid}>
        {calendarDays.map((date, idx) => {
          const isSelected =
            date &&
            selectedDate.getDate() === date &&
            selectedDate.getMonth() === visibleMonth &&
            selectedDate.getFullYear() === visibleYear;
          return (
            <TouchableOpacity
              key={idx}
              style={styles.dayCellWrapper}
              onPress={() => handleSelectDate(date)}
              disabled={!date}
            >
              <View
                style={[
                  styles.dayCell,
                  isSelected ? styles.selectedDayCell : null,
                ]}
              >
                {date ? (
                  <Text
                    style={[
                      styles.dayText,
                      isSelected ? styles.selectedDayText : null,
                    ]}
                  >
                    {date}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    margin: 24,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    alignSelf: "stretch",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  arrow: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.textSecondary,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    marginTop: 2,
  },
  weekday: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 13,
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  datesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayCellWrapper: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  dayCell: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDayCell: {
    backgroundColor: "#F04D23",
  },
  dayText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "400",
    textAlign: "center",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CalendarPicker;
