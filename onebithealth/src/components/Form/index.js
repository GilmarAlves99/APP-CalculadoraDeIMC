import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity , Vibration,Pressable,Keyboard} from "react-native"
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form() {
    const [heigth, setHeight] = useState(null)
    const [weight, setWeigth] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)

    function imcCalculator() {
        let heigthFormat = heigth.replace(",", ".")
        return setImc((weight / (heigthFormat * heigthFormat)).toFixed(2))
    }
function verificationImc(){
    if(imc== null){
        Vibration.vibrate(); 
        setErrorMessage("Campo obrigatório*")
    }
}

    function validationImc() {
        if (weight != null && heigth != null) {
            imcCalculator()
            setHeight(null)
            setWeigth(null)
            setMessageImc("Seu imc é igual:")
            setTextButton("Calcular Novamente")
            return
        }
        verificationImc()
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
      

    }

    return (

        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input}
                    onChangeText={setHeight}
                    value={heigth}
                    placeholder="Ex. 1.75"
                    keyboardType="numeric" />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input}
                    onChangeText={setWeigth}
                    value={weight}
                    placeholder="Ex. 75.54"
                    keyboardType="numeric" />
                <TouchableOpacity
                    style={styles.buttonCalculator}
                    onPress={() => {
                        validationImc()

                    }}
                >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc} />
        </Pressable>

    );
}