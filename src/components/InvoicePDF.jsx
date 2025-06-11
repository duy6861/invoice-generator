import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// 🎨 Thiết kế giao diện đẹp hơn
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#333',
    backgroundColor: '#fff',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: '1.5pt solid #e0e0e0',
  },
  companyInfo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2c3e50',
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  invoiceMeta: {
    fontSize: 12,
    color: '#555',
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  paid: {
    backgroundColor: '#28a745',
  },
  pending: {
    backgroundColor: '#dc3545',
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  column: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 6,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  colItemName: { flex: 3 },
  colQty: { flex: 1, textAlign: 'center' },
  colTotal: { flex: 1, textAlign: 'right' },
  totalContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'flex-end',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  footer: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#999',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
});

// 📄 Component chính
const InvoicePDF = ({ invoice }) => {
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
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.companyInfo}>{billFrom.company || "Company Name"}</Text>
            <Text>{billFrom.streetAddress}</Text>
            <Text>{billFrom.city}, {billFrom.postCode}, {billFrom.country}</Text>
          </View>
          <View style={{ textAlign: 'right' }}>
            <Text style={styles.invoiceTitle}>Invoice #{id}</Text>
            <Text style={styles.invoiceMeta}>Due Date: {dueDate}</Text>
            <Text style={[styles.statusBadge, statusStyle]}>{status}</Text>
          </View>
        </View>

        {/* 👤 Bill From & To */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Bill From:</Text>
            <Text>{billFrom.name || "John Doe"}</Text>
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
        <View style={{ marginBottom: 20 }}>
          <Text><Text style={styles.label}>Invoice Date:</Text> {invoiceDate}</Text>
          <Text><Text style={styles.label}>Payment Terms:</Text> {paymentTerms}</Text>
          <Text><Text style={styles.label}>Project:</Text> {projectDescription}</Text>
        </View>

        {/* 📦 Items Table */}
        <View style={{ marginBottom: 20 }}>
          <View style={styles.tableHeader}>
            <Text style={styles.colItemName}>Item</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colTotal}>Total</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colItemName}>{item.name}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colTotal}>${item.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* 💰 Total Amount */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalAmount}>Total: ${amount.toFixed(2)}</Text>
        </View>

        {/* 📝 Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
          <Text>Email: {billFrom.email || "support@company.com"}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;