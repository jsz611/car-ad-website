import axios from "axios";

interface Dados {
  id_car?: string;
  name_car?: string;
  brand?: string;
  year_of_manufacture?: number;
  description?: string;
  name?: string;
  email?: string;
  phone?: string;
}

const baseUrl = "https://api-loja-carro.onrender.com";

export const save = (data: Dados) => {
  axios
    .post(`${baseUrl}/createCar`, data)
    .then((response) => {
      const createdCar = response.data;
      console.log(createdCar);
    })
    .catch((error) => {
      console.log(error);
    });
};

export async function update(id_car: string, data: Dados) {
  const {
    name_car,
    brand,
    year_of_manufacture,
    description,
    name,
    email,
    phone,
  } = data;

  try {
    const response = await axios.patch(`${baseUrl}/changeCar/${id_car}`, {
      name_car: name_car || undefined,
      brand: brand || undefined,
      year_of_manufacture: year_of_manufacture || undefined,
      description: description || undefined,
      name: name || undefined,
      email: email || undefined,
      phone: phone || undefined,
    });

    return response.data, true;
  } catch (error) {
    console.error(error);
  }
  return true;
}

export async function deleteCar(containerCardId: string) {
  axios
    .delete(`${baseUrl}/deleteCar/${containerCardId}`)
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.log(error);
    });
}
