import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

// Componente personalizado de seleção para listas de itens simples
const CustomPicker = ({ items, selectedValue, onValueChange, placeholder }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedItem = items ? items.find(i => i.id === selectedValue) : null; // encontra o item selecionado

  return (
    <View style={{ marginBottom: 10, zIndex: 1000 }}>
      <TouchableOpacity 
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 12, backgroundColor: '#fff' }}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={{ color: selectedItem ? '#000' : '#888' }}>
          {selectedItem ? selectedItem.nome : placeholder}
        </Text>
      </TouchableOpacity>

      {modalVisible && (
        <View style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginTop: 5, maxHeight: 150 }}>
          <FlatList
            nestedScrollEnabled={true}
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}
                onPress={() => {
                  onValueChange(item.id);
                  setModalVisible(false);
                }}
              >
                <Text>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CustomPicker;
