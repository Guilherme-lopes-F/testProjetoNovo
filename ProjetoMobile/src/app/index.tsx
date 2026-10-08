import { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";

import { router } from "expo-router";

import { fazerLogin } from "../../services/api";

export default function Login() {

    const [Login, setLogin] = useState("");
    const [Senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function entrar() {

        if (!Login || !Senha) {

            Alert.alert(
                "Atenção",
                "Preencha todos os campos."
            );

            return;
        }

        try {

            setCarregando(true);

            const dados = await fazerLogin(
                Login,
                Senha
            );

            Alert.alert(
              "Sucesso",
              `Bem-vindo, ${dados.usuario.login}!`,
              [
                {
                  text: "Continuar",
                  onPress: () => router.replace("/explore")
                }
              ]
            );

        } catch (erro: any) {

            Alert.alert(
                "Erro",
                erro.message
            );

        } finally {

            setCarregando(false);

        }
    }

    return (

        <View style={styles.container}>

            <View style={styles.loginBox}>

                <Text style={styles.titulo}>
                    Login
                </Text>

                <Text style={styles.label}>
                    Usuário
                </Text>

                <TextInput
                    style={styles.input}
                    value={Login}
                    onChangeText={setLogin}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>
                    Senha
                </Text>

                <TextInput
                    style={styles.input}
                    value={Senha}
                    onChangeText={setSenha}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.botao}
                    onPress={entrar}
                    disabled={carregando}
                >

                    <Text style={styles.textoBotao}>
                        {carregando
                            ? "Entrando..."
                            : "Entrar"}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/cadastro")}
                >

                    <Text style={styles.link}>
                        Criar conta
                    </Text>

                </TouchableOpacity>

            </View>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#989ea3",
        padding: 20
    },

    loginBox: {
        width: "100%",
        maxWidth: 450,
        padding: 30,
        backgroundColor: "#f8f8f8",
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.35,
        shadowRadius: 10,

        elevation: 8
    },

    titulo: {
        fontSize: 28,
        fontWeight: "500",
        color: "#111111",
        textAlign: "center",
        marginBottom: 25
    },

    label: {
        fontSize: 14,
        color: "#222222",
        marginBottom: 6
    },

    input: {
        width: "100%",
        height: 45,
        paddingHorizontal: 14,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#e2e2e2",
        borderRadius: 6,
        backgroundColor: "#ffffff",
        fontSize: 14
    },

    botao: {
        width: "100%",
        height: 45,
        backgroundColor: "#38b6ff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },

    textoBotao: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold"
    },

    link: {
        color: "#38b6ff",
        textAlign: "center",
        fontSize: 13,
        marginTop: 18
    }

});
