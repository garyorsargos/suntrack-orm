-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE customer_segment AS ENUM ('RES', 'COM', 'SCHOOL', 'GOV', 'NON-PROFIT', 'NON-RES');
CREATE TYPE technology_type AS ENUM ('PV-only', 'PV+Storage', 'Storage-only', 'other');

-- Create the main solar_systems table
CREATE TABLE solar_systems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data_provider_1 VARCHAR(255),
    data_provider_2 VARCHAR(255),
    system_id_1 VARCHAR(255),
    system_id_2 VARCHAR(255),
    installation_date DATE,
    pv_system_size_dc DECIMAL(10,2),
    total_installed_price DECIMAL(12,2),
    customer_segment customer_segment,
    expansion_system BOOLEAN,
    multiple_phase_system BOOLEAN,
    rebate_or_grant DECIMAL(12,2),
    tts_link_id VARCHAR(255),
    new_construction BOOLEAN,
    tracking BOOLEAN,
    ground_mounted BOOLEAN,
    zip_code VARCHAR(10),
    city VARCHAR(255),
    state VARCHAR(2),
    utility_service_territory VARCHAR(255),
    third_party_owned BOOLEAN,
    installer_name VARCHAR(255),
    self_installed BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create module configurations table
CREATE TABLE module_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    solar_system_id UUID REFERENCES solar_systems(id),
    configuration_number INTEGER,
    azimuth DECIMAL(5,2),
    tilt DECIMAL(5,2),
    module_manufacturer VARCHAR(255),
    module_model VARCHAR(255),
    module_quantity INTEGER,
    technology_type VARCHAR(50),
    bipv BOOLEAN,
    bifacial BOOLEAN,
    nameplate_capacity DECIMAL(10,2),
    efficiency DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create inverter configurations table
CREATE TABLE inverter_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    solar_system_id UUID REFERENCES solar_systems(id),
    configuration_number INTEGER,
    inverter_manufacturer VARCHAR(255),
    inverter_model VARCHAR(255),
    inverter_quantity INTEGER,
    micro_inverter BOOLEAN,
    built_in_meter BOOLEAN,
    output_capacity DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create battery configurations table
CREATE TABLE battery_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    solar_system_id UUID REFERENCES solar_systems(id),
    battery_manufacturer VARCHAR(255),
    battery_model VARCHAR(255),
    rated_capacity_kw DECIMAL(10,2),
    rated_capacity_kwh DECIMAL(10,2),
    battery_price DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_solar_systems_installation_date ON solar_systems(installation_date);
CREATE INDEX idx_solar_systems_state ON solar_systems(state);
CREATE INDEX idx_solar_systems_zip_code ON solar_systems(zip_code);
CREATE INDEX idx_module_configurations_solar_system_id ON module_configurations(solar_system_id);
CREATE INDEX idx_inverter_configurations_solar_system_id ON inverter_configurations(solar_system_id);
CREATE INDEX idx_battery_configurations_solar_system_id ON battery_configurations(solar_system_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_solar_systems_updated_at
    BEFORE UPDATE ON solar_systems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_module_configurations_updated_at
    BEFORE UPDATE ON module_configurations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inverter_configurations_updated_at
    BEFORE UPDATE ON inverter_configurations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_battery_configurations_updated_at
    BEFORE UPDATE ON battery_configurations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 