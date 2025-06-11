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
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#111',
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  status: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
  },
  paid: {
    backgroundColor: '#28a745',
  },
  pending: {
    backgroundColor: '#dc3545',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  itemTableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid #ccc',
    paddingBottom: 4,
    marginBottom: 4,
  },
  itemTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  itemCol1: { flex: 2 },
  itemCol2: { flex: 1, textAlign: 'center' },
  itemCol3: { flex: 1, textAlign: 'right' },
  totalAmount: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
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
  const statusStyle = status === "paid" ? styles.paid : styles.pending;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 🧾 Header */}
        <View style={styles.section}>
          <Text style={styles.header}>Invoice #{id}</Text>
          <Text style={styles.subHeader}>{projectDescription}</Text>
          <Text style={[styles.status, statusStyle]}>{status}</Text>
        </View>

        {/* 🧍 From & To */}
        <View style={[styles.section, styles.row]}>
          <View style={styles.column}>
            <Text style={styles.label}>Bill From:</Text>
            <Text>{billFrom.streetAddress}</Text>
            <Text>{billFrom.city}, {billFrom.postCode}</Text>
            <Text>{billFrom.country}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Bill To:</Text>
            <Text>{clientName}</Text>
            <Text>{billTo.streetAddress}</Text>
            <Text>{billTo.city}, {billTo.postCode}</Text>
            <Text>{billTo.country}</Text>
          </View>
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
          <View style={styles.itemTableHeader}>
            <Text style={styles.itemCol1}>Item</Text>
            <Text style={styles.itemCol2}>Qty</Text>
            <Text style={styles.itemCol3}>Total</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.itemTableRow}>
              <Text style={styles.itemCol1}>{item.name}</Text>
              <Text style={styles.itemCol2}>{item.quantity}</Text>
              <Text style={styles.itemCol3}>${item.total}</Text>
            </View>
          ))}
        </View>

        {/* 💰 Total */}
        <View>
          <Text style={styles.totalAmount}>Total Amount: ${amount}</Text>
        </View>
      </Page>
    </Document>
  );
}
