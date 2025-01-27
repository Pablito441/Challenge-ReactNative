import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListItemCategories: React.FC<{ totalPages: number, onPageChange: (page: number) => void }> = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <TouchableOpacity
          key={i}
          onPress={() => handlePageChange(i)}
          style={[
            styles.pageButton,
            currentPage === i && styles.activePageButton,
          ]}
        >
          <Text style={styles.pageButtonText}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return pageNumbers;
  };

  return (
    <View style={styles.paginationContainer}>
      {renderPageNumbers()}
    </View>
  );
};
export default ListItemCategories;
const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageButton: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  activePageButton: {
    width: 35,
    height: 35,
    backgroundColor: '#333',
  },
  pageButtonText: {
    color: '#fff',
  },
});