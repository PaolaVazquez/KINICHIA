import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LogoutIcon from "../icons/LogoutIcon";
import MenuItem from "./MenuItem";
import UserProfile from "./UserProfile";

type Props = {
  onClose: () => void;
};

export default function SideMenu({ onClose }: Props) {
  const slideAnim = useRef(new Animated.Value(400)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  const menuItems = [
    {
      label: "Inicio",
      icon: <Feather name="home" size={26} color={Colors.aqua} />,
      active: true,
    },

    {
      label: "Análisis",
      icon: <Feather name="search" size={26} color="white" />,
    },

    {
      label: "Protección en tiempo real",
      icon: <Feather name="shield" size={26} color="white" />,
    },

    {
      label: "Navegación segura",
      icon: <Feather name="globe" size={26} color="white" />,
    },

    {
      label: "Informes",
      icon: <Feather name="bar-chart-2" size={26} color="white" />,
    },

    {
      label: "Notificaciones",
      icon: <Feather name="bell" size={26} color="white" />,
    },

    {
      label: "Perfil",
      icon: <Feather name="user" size={26} color="white" />,
    },

    {
      label: "Configuración",
      icon: <Feather name="settings" size={26} color="white" />,
    },

    {
      label: "Ayuda y soporte",
      icon: <Feather name="help-circle" size={26} color="white" />,
    },
  ];
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 250,
        useNativeDriver: true,
      }),

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };
  return (
    <View style={styles.overlay}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.backdrop,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateX: slideAnim,
              },
            ],
          },
        ]}
      >
        {/* Cerrar */}

        <Pressable style={styles.closeButton} onPress={handleClose}>
          <Feather name="x" size={35} color="white" />
        </Pressable>

        {/* Usuario */}
        <ScrollView>
          <UserProfile name="Paola Vázquez" email="paola.vazquez98@gmail.com" />
          {/* Menú */}

          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                active={item.active}
              />
            ))}
          </View>
        </ScrollView>
        <Pressable
          style={[styles.logoutRow, styles.logoutContainer]}
          onPress={handleClose}
        >
          <LogoutIcon />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",

    top: 0,
    right: 0,
    bottom: 0,

    width: "68%",

    backgroundColor: Colors.fondo,

    paddingHorizontal: 25,

    borderTopLeftRadius: 24,

    borderBottomLeftRadius: 24,

    overflow: "hidden",

    shadowColor: "#000",

    shadowOpacity: 0.25,

    shadowRadius: 18,

    shadowOffset: {
      width: -4,
      height: 0,
    },

    elevation: 20,
  },

  closeButton: {
    alignSelf: "flex-end",

    marginTop: 10,
  },

  menuContainer: {
    marginTop: 10,
  },

  logoutContainer: {
    marginTop: "auto",

    marginBottom: 50,
  },
  logoutRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",
    paddingHorizontal: 30,
    gap: 35,
  },
  logoutText: {
    color: "red",
    fontFamily: Fonts.bold,
    fontSize: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,

    zIndex: 999,

    justifyContent: "flex-start",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(0,0,0,0.35)",
  },
});
