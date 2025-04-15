import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PetProfile from "./Pages/AnimalPetProfile/PetProfile";
import AnimalProfile from "./Pages/AnimalPetProfile/AnimalProfile";
import Donation from "./Pages/Donation/Donation";
import Home from "./Pages/Home";

import ClinicDetails from "./Pages/ClinicDetails";
import Lost from "./Pages/Lost/Lost";
import Volunteering from "./Pages/Volunteering/Volunteering";
import RootLayout from "./Layout/RootLayout";
import Clinics from "./Pages/Clinics";
import NotFound from "./components/NotFound/NotFound";
import ClinicsLayout from "./Layout/ClinicsLayout";
import AdoptionForm from "./Pages/AdoptionForm/AdoptionForm";
import AnimalForAdopt from "./Pages/Adoption/AnimalForAdopt";
import AdoptionLayout from "./Layout/AdoptionLayout";
import AddPetForm from "./Pages/AddPetForm/AddPetForm";
import AdminLayout from "./Layout/AdminLayout";
import AdoptionRequest from "./components/AdoptionRequest/AdoptionRequest";
import Doctors from "./components/Doctors/Doctors";
import CreateAdmin from "./components/CreateAdmin/CreateAdmin";
import Login from "./Pages/Login/Login";
import {
  adoptionLoaderAnimals,
  adoptionLoaderPets,
} from "./Loader/AdoptionLoader";
import Signup from "./Pages/Signup/Signup";
import AddClinic from "./Pages/AddClinic";
import DoctorDashboard from "./Pages/DoctorHome";
import { Toaster } from "sonner";
import DoctorSignup from "./Pages/Signup/SignupDoctors";
import MyPets from "./Pages/MyPets";
import PetsForAdopt from "./Pages/Adoption/PetsForAdopt";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/doctor-signup" element={<DoctorSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-clinic" element={<AddClinic />} />

        <Route path="clinics" element={<ClinicsLayout />}>
          <Route index element={<Clinics />} />
        </Route>
        <Route path="clinic-details/:id" element={<ClinicDetails />} />

        <Route path="lost" element={<Lost />} />

        <Route path="donation" element={<Donation />} />
        {/* <Route path="payment/:amount" element={<Payment />} />
        <Route path="code" element={<Code />} /> */}

        <Route path="pet-profile/:id" element={<PetProfile />} />
        <Route path="animal-profile/:id" element={<AnimalProfile />} />

        <Route path="add-pet-profile" element={<AddPetForm />} />
        <Route path="my-pets" element={<MyPets />} />
        {/* <Route path="my-cart" element={<Cart />} /> */}

        <Route path="volunteering" element={<Volunteering />} />
        <Route path="doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="pet-profile" element={<PetProfile />} />

        <Route path="adoption" element={<AdoptionLayout />}>
          <Route
            path="animal-adopt"
            element={<AnimalForAdopt />}
            loader={adoptionLoaderAnimals}
          />
          <Route
            path="pets-adopt"
            element={<PetsForAdopt />}
            loader={adoptionLoaderPets}
          />
          <Route path="adoption-form" element={<AdoptionForm />} />
        </Route>

        <Route path="*" element={<NotFound />} />

        <Route path="admin" element={<AdminLayout />}>
          <Route path="pets" element={<Volunteering />} />
          <Route path="adoption-request" element={<AdoptionRequest />} />
          <Route path="adoption-request/:id" element={<AdoptionRequest />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="create-admin" element={<CreateAdmin />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

export default App;
