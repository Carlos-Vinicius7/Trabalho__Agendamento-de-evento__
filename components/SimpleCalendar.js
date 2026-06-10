import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { globalStyles } from '../screens/Styles/globalStyles';

// Componente de calendário simples para seleção de intervalo de datas
export default function SimpleCalendar({ visible, onClose, onConfirm }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dataInicio, setDataInicio] = useState(null); // objeto com year, month, day
  const [dataFim, setDataFim] = useState(null); // objeto com year, month, day

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(year, month);
  const dias = Array.from({length: daysInMonth}, (_, i) => i + 1);

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const changeMonth = (offset) => setCurrentDate(new Date(year, month + offset, 1));
  const changeYear = (offset) => setCurrentDate(new Date(year + offset, month, 1));

  const isBefore = (d1, d2) => {
    if (!d1 || !d2) return false;
    if (d1.year !== d2.year) return d1.year < d2.year;
    if (d1.month !== d2.month) return d1.month < d2.month;
    return d1.day < d2.day;
  };
  
  const isSame = (d1, d2) => d1 && d2 && d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;

  const handleSelect = (day) => {
    const selected = { year, month, day };

    // Define se o clique inicia ou finaliza o intervalo de datas
    if (!dataInicio || (dataInicio && dataFim)) {
      setDataInicio(selected);
      setDataFim(null);
    } else if (isBefore(selected, dataInicio)) {
      setDataInicio(selected);
      setDataFim(null);
    } else {
      setDataFim(selected);
    }
  };

  const formatDate = (d) => {
    if (!d) return null;
    return `${d.year}-${(d.month + 1).toString().padStart(2, '0')}-${d.day.toString().padStart(2, '0')}`;
  };

  const handleConfirm = () => {
    if (dataInicio) {
      const startStr = formatDate(dataInicio);
      const endStr = formatDate(dataFim) || startStr;
      onConfirm(startStr, endStr);
    }
    onClose();
  };

  const isSelectedDay = (day) => {
    const d = { year, month, day };
    if (isSame(d, dataInicio) || isSame(d, dataFim)) return true;
    if (dataInicio && dataFim && isBefore(dataInicio, d) && isBefore(d, dataFim)) return true;
    return false;
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
        <View style={{ backgroundColor: '#fff', padding: 25, borderRadius: 20 }}>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={() => changeYear(-1)} style={{ padding: 5 }}>
              <Text style={{ fontSize: 18, color: '#64748b', fontWeight: 'bold' }}>{'<<'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeMonth(-1)} style={{ padding: 5 }}>
              <Text style={{ fontSize: 18, color: '#64748b', fontWeight: 'bold' }}>{'<'}</Text>
            </TouchableOpacity>
            
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1e1b4b', minWidth: 120, textAlign: 'center' }}>
              {monthNames[month]} {year}
            </Text>
            
            <TouchableOpacity onPress={() => changeMonth(1)} style={{ padding: 5 }}>
              <Text style={{ fontSize: 18, color: '#64748b', fontWeight: 'bold' }}>{'>'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeYear(1)} style={{ padding: 5 }}>
              <Text style={{ fontSize: 18, color: '#64748b', fontWeight: 'bold' }}>{'>>'}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 25 }}>
            {dias.map(dia => {
              const isSelected = isSelectedDay(dia);
              return (
                <TouchableOpacity 
                  key={dia} 
                  onPress={() => handleSelect(dia)}
                  style={{
                    width: 40, height: 40, justifyContent: 'center', alignItems: 'center',
                    margin: 2, borderRadius: 12,
                    backgroundColor: isSelected ? '#4f46e5' : '#f8fafc'
                  }}
                >
                  <Text style={{ color: isSelected ? '#fff' : '#1e1b4b', fontWeight: isSelected ? 'bold' : 'normal' }}>
                    {dia}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 15 }}>
            <TouchableOpacity style={globalStyles.buttonSecondary} onPress={onClose}>
              <Text style={globalStyles.buttonTextSecondary}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleConfirm}>
              <Text style={globalStyles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
