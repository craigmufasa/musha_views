export const formatPrice = (price: number): string => {
  // For rentals (under 10,000) we assume it's monthly rent
  if (price < 10000) {
    return `$${price.toLocaleString()}/mo`;
  }
  
  // For sales prices
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`;
  }
  
  return `$${price.toLocaleString()}`;
};

export const formatAddress = (property: { 
  address: string; 
  city: string; 
  state: string; 
  zipCode: string;
}): string => {
  return `${property.address}, ${property.city}, ${property.state} ${property.zipCode}`;
};