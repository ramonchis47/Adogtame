import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Adoptados from "./Adoptados";
import { getAuth } from "firebase/auth";
import firebase from "../../DataBase/firebase";

const ContenidoAdopciones = React.memo(({ navigator }) => {
  navigator = useNavigation();
  const auth = getAuth();
  const usuario = auth.currentUser;
  const [ids, setIds] = useState([]);

  async function request() {
    try {
      const mascotasAdoptadasRef = firebase.db.collection("Mascotas Adoptadas");
      const query = mascotasAdoptadasRef
        .where("idDuennoAdoptado", "==", `${usuario.email}`)
        .onSnapshot((e) => {
          setIds([]);
          e.docs.forEach((e) => setIds((prevIds) => [...prevIds, e.id]));
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    request();
    setIds([]);
  }, []);

  return (
    <View style={styles.container}>
      {ids.map((e) => (
        <Adoptados
          id={e}
          key={e}
          onPress={() =>
            navigator.navigate("Adoptado", { id: e, navigator: navigator })
          }
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f8",
    width: "100%",
    paddingBottom: "5%",
  },
});

export default ContenidoAdopciones;
