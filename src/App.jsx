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
import MyCart from "./Pages/MyCart";
import Chat from "./Pages/Chat";
import RecentChats from "./Pages/RecentChats/RecentChats";
import ChatList from "./Pages/ChatList";
import Sidenav from "./components/SidenavDoctor";
import DoctorLayout from "./Layout/DoctorLayout";
import DoctorProfile from "./Pages/DoctorProfile";
import MyClinics from "./Pages/MyClinics";
import MyAppointments from "./Pages/Appointments";
import PrivateRoute from "./components/PrivateRoute";
import SymptomSelector from "./Pages/Machine/SymptomSelector";
import SkinDiseasePrediction from "./Pages/Machine/DiseasePhoto";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor-signup" element={<Signup />} />
        <Route path="/signup" element={<DoctorSignup />} />

        {/* Protected Routes - Any logged-in user */}
        <Route element={<PrivateRoute />}>
          <Route path="add-pet-profile" element={<AddPetForm />} />
          <Route path="my-pets" element={<MyPets />} />
          <Route path="my-cart" element={<MyCart />} />
          <Route path="chat/:id" element={<Chat />} />
          <Route path="clinics" element={<ClinicsLayout />}>
            <Route index element={<Clinics />} />
          </Route>
          <Route path="clinic-details/:id" element={<ClinicDetails />} />

          <Route path="lost" element={<Lost />} />

          <Route path="donation" element={<Donation />} />
          <Route path="pet-profile/:id" element={<PetProfile />} />
          <Route path="animal-profile/:id" element={<AnimalProfile />} />

          <Route path="volunteering" element={<Volunteering />} />
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
            <Route path="adoption-form/:id" element={<AdoptionForm />} />
          </Route>
          <Route path="chat/:id" element={<Chat />} />
          <Route path="RecentChats" element={<RecentChats />} />
          <Route path="ChatList" element={<ChatList />} />
        </Route>

        {/* Protected Routes - Doctors only */}
        <Route element={<PrivateRoute allowedRoles={["Doctor"]} />}>
          <Route path="doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="doctor" element={<DoctorLayout />}>
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="appointments" element={<MyAppointments />} />
            <Route path="clinics" element={<MyClinics />} />
            <Route path="add-clinic" element={<AddClinic />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="RecentChats" element={<RecentChats />} />
            <Route path="ChatList" element={<ChatList />} />
          </Route>
        </Route>

        {/* Protected Routes - Admins only */}
        <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="pets" element={<Volunteering />} />
            <Route path="adoption-request" element={<AdoptionRequest />} />
            <Route path="adoption-request/:id" element={<AdoptionRequest />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="create-admin" element={<CreateAdmin />} />
          </Route>
        </Route>
        <Route path="symptom-selector" element={<SymptomSelector />} />
        <Route path="disease-photo" element={<SkinDiseasePrediction />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
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
