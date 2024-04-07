import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { formatDate, calculateTotalAmount } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },
  greeting: {
    fontSize: 16,
    marginBottom: 10
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: { width: "25%", backgroundColor: "#7104dc", padding: 5, borderRightWidth: 1, borderBottomWidth: 1 },
  tableCol: { width: "25%", backgroundColor: "#f2f2f2", padding: 5, borderRightWidth: 1, borderBottomWidth: 1 }
});

export const ExpensePdfDocument = ({ expenses, username }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi {username} 👋,</Text>
        <Text style={styles.title}>Your Last 7 Day Expenses</Text>
        <Text>Total: {calculateTotalAmount(expenses)}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableColHeader, { color: "#ffffff" }]}>Title</Text>
          <Text style={[styles.tableColHeader, { color: "#ffffff" }]}>Description</Text>
          <Text style={[styles.tableColHeader, { color: "#ffffff" }]}>Amount</Text>
          <Text style={[styles.tableColHeader, { color: "#ffffff" }]}>Date</Text>
        </View>
        {expenses?.map((expense, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{expense.title}</Text>
            <Text style={styles.tableCol}>{expense.description}</Text>
            <Text style={styles.tableCol}>{expense.amount}</Text>
            <Text style={styles.tableCol}>{formatDate(expense.date)}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
