import { Inter_100Thin } from '@expo-google-fonts/inter';
import React, { useState } from 'react';
import { View, Text, FlatList, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { Container, TabHeader } from './styles';

const headerTabs = [
  { key: '0', title: 'MEUS CONTATOS' },
  { key: '1', title: 'COMPROVANTES' },
];
const Tab: React.FC = () => {
  const [selectTab, setSelectTab] = useState('0');

  const handleTabPress = (item: any) => {};

  return (
    <Container>
      <TabHeader>
        <FlatList
          data={headerTabs}
          style={
            {
              // marginHorizontal: 20,
            }
          }
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          renderItem={({ item }) => (
            <View
            // style={{
            //   width: '50%',
            // }}
            >
              <TouchableOpacity onPress={() => setSelectTab(item.key)}>
                <View
                  style={{
                    width: 200,
                    // justifyContent: 'space-between',
                    backgroundColor: item.key === '0' ? 'green' : 'blue',
                  }}
                >
                  <Text>{item.title}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </TabHeader>
      {selectTab === '0' ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#f5f5f5',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>MEUS CONTATOS</Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#f6f6f6',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>COMPROVANTES</Text>
        </View>
      )}
    </Container>
  );
};

export default Tab;
