require('dotenv').config();
const fs = require('fs');
const { parse } = require('csv-parse');
const pgp = require('pg-promise')();

// Database connection configuration
const db = pgp({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'suntrack',
    user: process.env.DB_USER || 'suntrack',
    password: process.env.DB_PASSWORD || 'suntrack'
});

// Function to process a single row of data
async function processRow(row) {
    try {
        // Insert into solar_systems table
        const solarSystem = await db.one(`
            INSERT INTO solar_systems (
                data_provider_1, data_provider_2, system_id_1, system_id_2,
                installation_date, pv_system_size_dc, total_installed_price,
                customer_segment, expansion_system, multiple_phase_system,
                rebate_or_grant, tts_link_id, new_construction, tracking,
                ground_mounted, zip_code, city, state, utility_service_territory,
                third_party_owned, installer_name, self_installed
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
                $15, $16, $17, $18, $19, $20, $21, $22
            ) RETURNING id
        `, [
            row.data_provider_1, row.data_provider_2, row.system_ID_1, row.system_ID_2,
            row.installation_date, row.PV_system_size_DC, row.total_installed_price,
            row.customer_segment, row.expansion_system, row.multiple_phase_system,
            row.rebate_or_grant, row.TTS_link_ID, row.new_construction, row.tracking,
            row.ground_mounted, row.zip_code, row.city, row.state, row.utility_service_territory,
            row.third_party_owned, row.installer_name, row.self_installed
        ]);

        // Process module configurations
        for (let i = 1; i <= 3; i++) {
            if (row[`module_manufacturer_${i}`]) {
                await db.none(`
                    INSERT INTO module_configurations (
                        solar_system_id, configuration_number, azimuth, tilt,
                        module_manufacturer, module_model, module_quantity,
                        technology_type, bipv, bifacial, nameplate_capacity, efficiency
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                `, [
                    solarSystem.id, i,
                    row[`azimuth_${i}`], row[`tilt_${i}`],
                    row[`module_manufacturer_${i}`], row[`module_model_${i}`],
                    row[`module_quantity_${i}`], row[`technology_module_${i}`],
                    row[`BIPV_module_${i}`], row[`bifacial_module_${i}`],
                    row[`nameplate_capacity_module_${i}`], row[`efficiency_module_${i}`]
                ]);
            }
        }

        // Process inverter configurations
        for (let i = 1; i <= 3; i++) {
            if (row[`inverter_manufacturer_${i}`]) {
                await db.none(`
                    INSERT INTO inverter_configurations (
                        solar_system_id, configuration_number,
                        inverter_manufacturer, inverter_model, inverter_quantity,
                        micro_inverter, built_in_meter, output_capacity
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                `, [
                    solarSystem.id, i,
                    row[`inverter_manufacturer_${i}`], row[`inverter_model_${i}`],
                    row[`inverter_quantity_${i}`], row[`micro_inverter_${i}`],
                    row[`built_in_meter_inverter_${i}`], row[`output_capacity_inverter_${i}`]
                ]);
            }
        }

        // Process battery configuration if exists
        if (row.battery_manufacturer) {
            await db.none(`
                INSERT INTO battery_configurations (
                    solar_system_id, battery_manufacturer, battery_model,
                    rated_capacity_kw, rated_capacity_kwh, battery_price
                ) VALUES ($1, $2, $3, $4, $5, $6)
            `, [
                solarSystem.id, row.battery_manufacturer, row.battery_model,
                row.battery_rated_capacity_kW, row.battery_rated_capacity_kWh,
                row.battery_price
            ]);
        }

    } catch (error) {
        console.error('Error processing row:', error);
        console.error('Problematic row:', row);
    }
}

// Main import function
async function importCSV(filePath) {
    const parser = fs
        .createReadStream(filePath)
        .pipe(parse({
            columns: true,
            skip_empty_lines: true,
            trim: true
        }));

    let count = 0;
    const batchSize = 1000;
    let batch = [];

    for await (const row of parser) {
        batch.push(row);
        count++;

        if (batch.length >= batchSize) {
            await Promise.all(batch.map(processRow));
            console.log(`Processed ${count} records`);
            batch = [];
        }
    }

    // Process remaining records
    if (batch.length > 0) {
        await Promise.all(batch.map(processRow));
        console.log(`Processed ${count} records`);
    }

    console.log('Import completed');
    process.exit(0);
}

// Check if file path is provided
const filePath = process.argv[2];
if (!filePath) {
    console.error('Please provide the path to the CSV file');
    process.exit(1);
}

// Start import
importCSV(filePath).catch(error => {
    console.error('Import failed:', error);
    process.exit(1);
}); 