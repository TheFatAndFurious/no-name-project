"use client";

import CreateGalery from "../components/admin/createGalery";
import DisplayGaleries from "../components/admin/displayGaleries";

export default function AdminDashboard() {
  return (
    <>
      <h1>Welcome Admin !</h1>
      <CreateGalery tableName="galeries" />
      <DisplayGaleries />
    </>
  );
}
