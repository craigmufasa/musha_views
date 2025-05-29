import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { colors } from "@/constants/colors";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterModal } from "@/components/FilterModal";
import { EmptyState } from "@/components/EmptyState";
import { usePropertyStore } from "@/store/property-store";

export default function SearchScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const { getFilteredProperties, resetFilter } = usePropertyStore();
  
  const filteredProperties = getFilteredProperties();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <SearchBar onFilterPress={() => setFilterModalVisible(true)} />
      
      {filteredProperties.length > 0 ? (
        <FlatList
          data={filteredProperties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PropertyCard property={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState 
          type="search" 
          onAction={() => resetFilter()} 
        />
      )}
      
      <FilterModal 
        visible={filterModalVisible} 
        onClose={() => setFilterModalVisible(false)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
});