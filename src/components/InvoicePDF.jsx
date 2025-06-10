import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    padding: 5,
    borderRadius: 4,
    width: 'auto',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  paid: {
    color: 'green',
  },
  pending: {
    color: 'red',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
});
export default function InvoicePDF({ invoice }) {
  const {
    id,
    clientName,
    status,
    projectDescription,
    dueDate,
    invoiceDate,
    paymentTerms,
    billFrom,
    billTo,
    items,
    amount,
  } = invoice;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 🧾 Header */}
        <View style={styles.section}>
          <Text style={styles.header}>Invoice #{id}</Text>
          <Text>{projectDescription}</Text>
        </View>

        {/* 📌 Status */}
        <View style={styles.section}>
          <Text style={[styles.status, status === "paid" ? styles.paid : styles.pending]}>
            {status}
          </Text>
        </View>

        {/* 🏢 Bill From */}
        <View style={styles.section}>
          <Text style={styles.label}>Bill From:</Text>
          <Text>{billFrom.streetAddress}</Text>
          <Text>{billFrom.city}, {billFrom.postCode}</Text>
          <Text>{billFrom.country}</Text>
        </View>

        {/* 👤 Bill To */}
        <View style={styles.section}>
          <Text style={styles.label}>Bill To:</Text>
          <Text>{clientName}</Text>
          <Text>{billTo.streetAddress}</Text>
          <Text>{billTo.city}, {billTo.postCode}</Text>
          <Text>{billTo.country}</Text>
        </View>

        {/* 📅 Dates */}
        <View style={styles.section}>
          <Text><Text style={styles.label}>Invoice Date:</Text> {invoiceDate}</Text>
          <Text><Text style={styles.label}>Due Date:</Text> {dueDate}</Text>
          <Text><Text style={styles.label}>Payment Terms:</Text> {paymentTerms}</Text>
        </View>

        {/* 📦 Items */}
        <View style={styles.section}>
          <Text style={styles.label}>Items:</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text>{item.name} (x{item.quantity})</Text>
              <Text>${item.total}</Text>
            </View>
          ))}
        </View>

        {/* 💰 Total */}
        <View style={styles.section}>
          <Text style={styles.label}>Total Amount: ${amount}</Text>
        </View>
      </Page>
    </Document>
  );
}
