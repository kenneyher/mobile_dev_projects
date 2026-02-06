import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [reverseCount, setReverseCount] = useState(0);
  const containerRef = useRef(null);
  let countOld = 1;

  useEffect(() => {
    // alert("Count has been updated");
    if (count % 2 == 0) {
      containerRef.current.setNativeProps({
        style: { ...styles.container, backgroundColor: 'red' }
      });
    } else {
      containerRef.current.setNativeProps({
        style: { ...styles.container, backgroundColor: 'blue' }
      });
    }
  }, [count]);

  useEffect(() => {
    alert("Reverse Count has been updated");
  }, [reverseCount])

  return (
    <View style={styles.container} ref={containerRef}>
      <Text>Old Count: {countOld}</Text>
      <Text>Count: {count}</Text>
      <Button title="Increase" onPress={() => {
        setCount(count + 1);
        // setCount(count);
      }} />
      <Text>Reverse Count: {reverseCount}</Text>
      <Button title="Decrease" onPress={() => {
        setReverseCount(reverseCount - 1);
        // setCount(count);
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
