require('dotenv').config();

module.exports = {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseKey: process.env.SUPABASE_SERVICE_KEY || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    jwtSecret: process.env.SUPABASE_JWT_SECRET || '',
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    clinic: {
        name: process.env.CLINIC_NAME || 'مركز قنديل لطب الأسنان',
        phone: process.env.CLINIC_PHONE || '+201000000000',
        whatsapp: process.env.CLINIC_WHATSAPP || '+201000000000'
    }
};