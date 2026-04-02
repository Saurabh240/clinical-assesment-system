import { useState, useEffect } from "react";
import api from "../../../api/axios";

export default function useUserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (type, msg) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 3500);
    };

    /* ── Fetch all pharmacists for this pharmacy on mount ── */
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const { data } = await api.get("/admin/users");
                // Normalise to the shape the UI expects
                const normalised = data.map((u) => ({
                    id: u.id,
                    name: `${u.firstName} ${u.lastName}`,
                    email: u.email,
                    role: u.role === "PHARMACIST" ? "Pharmacist" : "Admin",
                    status: u.status === "ACTIVE" ? "Active" : "Inactive",
                    firstName: u.firstName,
                    lastName: u.lastName,
                }));
                setUsers(normalised);
            } catch (err) {
                showToast("error", err.response?.data?.message || "Failed to load users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    /* ── Create ── */
    const addUser = async (formData) => {
        setLoading(true);
        try {
            // Split "Full Name" back into first/last for the API
            const [firstName, ...rest] = formData.name.trim().split(" ");
            const lastName = rest.join(" ") || "";

            const { data } = await api.post("/admin/users", {
                firstName,
                lastName,
                email: formData.email,
                password: formData.password,
            });

            const newUser = {
                id: data.id,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                role: "Pharmacist",
                status: data.status === "ACTIVE" ? "Active" : "Inactive",
                firstName: data.firstName,
                lastName: data.lastName,
            };

            setUsers((prev) => [newUser, ...prev]);
            showToast("success", `Pharmacist "${newUser.name}" added successfully.`);
            return true;
        } catch (err) {
            showToast("error", err.response?.data?.message || "Failed to add user.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    /* ── Update ── */
    const updateUser = async (id, formData) => {
        setLoading(true);
        try {
            const [firstName, ...rest] = formData.name.trim().split(" ");
            const lastName = rest.join(" ") || "";

            const { data } = await api.put(`/admin/users/${id}`, {
                firstName,
                lastName,
                status: formData.status === "Active" ? "ACTIVE" : "INACTIVE",
            });

            const updated = {
                id: data.id,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                role: "Pharmacist",
                status: data.status === "ACTIVE" ? "Active" : "Inactive",
                firstName: data.firstName,
                lastName: data.lastName,
            };

            setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
            showToast("success", `Pharmacist "${updated.name}" updated successfully.`);
            return true;
        } catch (err) {
            showToast("error", err.response?.data?.message || "Failed to update user.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    /* ── Soft delete (marks INACTIVE on backend) ── */
    const deleteUser = async (id) => {
        setLoading(true);
        try {
            const name = users.find((u) => u.id === id)?.name;
            await api.delete(`/admin/users/${id}`);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            showToast("success", `Pharmacist "${name}" removed.`);
            return true;
        } catch (err) {
            showToast("error", err.response?.data?.message || "Failed to delete user.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { users, loading, toast, showToast, addUser, updateUser, deleteUser };
}