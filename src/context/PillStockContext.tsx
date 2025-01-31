import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Définition du type PillStock.
 * Représente le stock de pilules pour un médicament.
 * 
 * @typedef {Object} PillStock
 * @property {string} id - L'ID du médicament.
 * @property {number} pillCount - Le nombre de pilules restantes pour ce médicament.
 */
export type PillStock = {
  id: string;
  pillCount: number;
};

/**
 * Type pour le contexte des stocks de pilules. Contient la liste des stocks
 * de pilules et une fonction pour mettre à jour cette liste.
 * 
 * @typedef {Object} PillStockContextType
 * @property {PillStock[]} pillStocks - Liste des stocks de pilules.
 * @property {function} setPillStocks - Fonction pour mettre à jour la liste des stocks de pilules.
 */
type PillStockContextType = {
  pillStocks: PillStock[];
  setPillStocks: (pillStocks: PillStock[]) => void;
};

// Création du contexte PillStockContext avec une valeur par défaut de undefined.
const PillStockContext = createContext<PillStockContextType | undefined>(undefined);

/**
 * Hook personnalisé pour accéder au contexte des stocks de pilules.
 * 
 * @returns {PillStockContextType} - Retourne les stocks de pilules et la fonction pour les mettre à jour.
 * @throws {Error} - Lève une erreur si le hook est utilisé en dehors du `PillStockProvider`.
 */
export const usePillStock = (): PillStockContextType => {
  const context = useContext(PillStockContext);
  if (!context) {
    throw new Error('usePillStock must be used within a PillStockProvider');
  }
  return context;
};

/**
 * Composant `PillStockProvider` qui fournit l'état des stocks de pilules et
 * la fonction pour les mettre à jour à tous les composants enfants.
 * 
 * @param {Object} props - Propriétés passées au composant.
 * @param {ReactNode} props.children - Les enfants du composant, qui auront accès au contexte des stocks de pilules.
 * 
 * @returns {JSX.Element} - Le composant `PillStockProvider` qui enveloppe les enfants.
 */
export const PillStockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // État local pour stocker la liste des stocks de pilules.
  const [pillStocks, setPillStocks] = useState<PillStock[]>([]);

  /**
   * Fonction pour charger les stocks de pilules depuis AsyncStorage au démarrage de l'application.
   * Cette fonction est appelée une fois grâce à useEffect.
   */
  const loadPillStocks = async () => {
    try {
      // Tente de récupérer les stocks de pilules sauvegardés dans AsyncStorage.
      const storedPillStocks = await AsyncStorage.getItem('pillStocks');
      if (storedPillStocks) {
        // Si des stocks de pilules sont trouvés, on les parse et les met dans l'état.
        setPillStocks(JSON.parse(storedPillStocks));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des stocks de pilules:', error);
    }
  };

  // Utilisation de useEffect pour appeler loadPillStocks une seule fois au démarrage.
  useEffect(() => {
    loadPillStocks();
  }, []); // Le tableau vide [] garantit que l'effet est exécuté une seule fois lors du montage.

  /**
   * Fonction pour mettre à jour les stocks de pilules dans l'état local et dans AsyncStorage.
   * 
   * @param {PillStock[]} newPillStocks - La nouvelle liste de stocks de pilules.
   */
  const updatePillStocks = async (newPillStocks: PillStock[]) => {
    setPillStocks(newPillStocks);
    // Sauvegarde des nouveaux stocks de pilules dans AsyncStorage.
    await AsyncStorage.setItem('pillStocks', JSON.stringify(newPillStocks));
  };

  return (
    <PillStockContext.Provider value={{ pillStocks, setPillStocks: updatePillStocks }}>
      {children}
    </PillStockContext.Provider>
  );
};
