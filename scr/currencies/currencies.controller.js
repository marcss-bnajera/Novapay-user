import axios from 'axios';
import { Account } from '../accounts/accounts.model.js';

export const convertCurrency = async (req, res) => {
    try {
        const { account_number } = req.params;
        const targetCurrency = (req.query.to || 'USD').toUpperCase();

        const account = await Account.findOne({ where: { numero_cuenta: account_number } });
        if (!account) return res.status(404).json({ success: false, message: "Cuenta no encontrada" });

        const balanceGTQ = parseFloat(account.balance);
        let convertedBalance = 0;
        let rate = 0;

        const symbols = { 'EUR': '€', 'GBP': '£', 'USD': '$', 'MXN': '$' };
        let symbol = symbols[targetCurrency] || '$';

        try {
            const response = await axios.get(`https://open.er-api.com/v6/latest/GTQ`);
            rate = response.data.rates[targetCurrency];

            if (rate) {
                convertedBalance = balanceGTQ * rate;
            } else {
                throw new Error("Moneda no soportada por la API");
            }
        } catch (error) {
            const fallbacks = { 'USD': 0.13, 'EUR': 0.12, 'GBP': 0.10 };
            rate = fallbacks[targetCurrency] || 0.13;
            convertedBalance = balanceGTQ * rate;
            console.log("⚠️ Aviso: Usando tipo de cambio estático (Fallback)");
        }

        res.status(200).json({
            success: true,
            data: {
                cuenta: account_number,
                balance_quetzales: `Q${balanceGTQ.toFixed(2)}`,
                moneda_destino: targetCurrency,
                tipo_cambio: rate.toFixed(4),
                balance_convertido: `${symbol}${convertedBalance.toFixed(2)}`
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};