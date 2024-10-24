import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Footer = () => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(0); 
    const getButtonColor = (index) => {
        return activeButtonIndex === index ? '#C9E0F8' : '#FFFFFF'; 
    };
    const getSvgColor = (index) => {
        return activeButtonIndex === index ? '#0073C5' : '#838A91'; 
    };

    return (
        <View style={styles.footer}>
            <TouchableOpacity 
               style={[styles.button, { backgroundColor: getButtonColor(0) }]}
                onPress={() => setActiveButtonIndex(0)}
            >
                <Svg viewBox="0 0 24 24" width="40" height="40">
                    <Path 
                        d="m12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81zM12 3L2 12h3v8h6v-6h2v6h6v-8h3z" 
                        fill= {getSvgColor(0)}
                    />
                </Svg>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, { backgroundColor: getButtonColor(1) }]}
                onPress={() => setActiveButtonIndex(1)}
            >
                <Svg viewBox="0 0 24 24" width="40" height="40">
                    <Path
                        d="M8 4h8V2h2v2h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V2h2zM5 8v12h14V8zm2 3h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm0 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2H7z"
                        fill={getSvgColor(1)}
                    />
                </Svg>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, { backgroundColor: getButtonColor(2) }]}
                onPress={() => setActiveButtonIndex(2)}
            >
                <Svg viewBox="0 0 24 24" width="40" height="40">
                    <Path 
                        d="M8.625 21q-2.35 0-3.988-1.638T3 15.376q0-1.125.425-2.15T4.65 11.4l6.75-6.75q.8-.8 1.825-1.225T15.375 3q2.35 0 3.988 1.637T21 8.625q0 1.125-.425 2.15T19.35 12.6l-6.75 6.75q-.8.8-1.825 1.225T8.625 21m6.65-7.15l2.675-2.65q.5-.5.775-1.175t.275-1.4q0-1.5-1.062-2.562T15.375 5q-.725 0-1.4.275T12.8 6.05l-2.65 2.675zM8.625 19q.725 0 1.4-.275t1.175-.775l2.65-2.675l-5.125-5.125L6.05 12.8q-.5.5-.775 1.175T5 15.375q0 1.5 1.063 2.563T8.625 19"
                        fill={getSvgColor(2)}
                    />
                </Svg>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, { backgroundColor: getButtonColor(3) }]}
                onPress={() => setActiveButtonIndex(3)}
            >
                <Svg viewBox="0 0 24 24" width="40" height="40">
                    <Path 
                        d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"
                        fill={getSvgColor(3)}
                    />
                </Svg>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        height: 80, 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 20,
        margin: 0,
    },
    button: {
        borderRadius: 999, 
        padding: 10, 
    },
});

export default Footer;
