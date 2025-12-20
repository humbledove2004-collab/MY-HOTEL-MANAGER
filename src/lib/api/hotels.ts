import { Hotels} from "../types/hotel";
import { mockHotelData } from "../data/mocHotels";

export async function fetchhotels(): Promise<Hotels[]> {
   await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockHotelData;
}

export async function fetchhotel(): Promise<Hotels[]> {
     await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockHotelData;  
}
