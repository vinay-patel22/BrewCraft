import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';



const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
};


export default function HomeScreen() {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  // console.log('CoffeeLIST =', CoffeeList.length);
  const BeanList = useStore((state: any) => state.BeanList);
  // console.log('BeanLIST =', BeanList.length);
  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = useState(undefined);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList),);


  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        {/* Add Header */}
        <HeaderBar />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1
  }
})