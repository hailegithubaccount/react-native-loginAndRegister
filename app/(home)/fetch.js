import { Pressable, StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://10.141.221.60:5000/api/users'); // Replace <Your IP> with your computer's IP
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <Ionicons
          onPress={() => router.back()}
          style={styles.backIcon}
          name="arrow-back"
          size={24}
          color="black"
        />
        <View style={styles.searchContainer}>
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={styles.input}
            placeholder="Search"
          />
          <Pressable onPress={() => router.push("/adddetails")}>
            <AntDesign name="pluscircle" size={30} color="#0072b1" />
          </Pressable>
        </View>
      </View>

      {users.length === 0 ? (
        // Display this when there's no data in the database
        <View style={styles.noDataContainer}>
          <Text>No Data</Text>
          <Text>Press the plus button to add a User</Text>
          <Pressable onPress={() => router.push("/adddetails")}>
            <AntDesign
              style={styles.addButton}
              name="pluscircle"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      ) : (
        filteredUsers.length > 0 ? (
          // Display filtered results if there are matching users
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Username</Text>
              <Text style={styles.headerCell}>Email</Text>
            </View>
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.cell}>{item.username}</Text>
                  <Text style={styles.cell}>{item.email}</Text>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.noDataText}>No users found</Text>}
            />
          </View>
        ) : (
          // Display this when users are present but no matches found for the search term
          <Text style={styles.noDataText}>No users found</Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  backIcon: {
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 3,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  tableContainer: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    marginTop: 30,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default UserList;
