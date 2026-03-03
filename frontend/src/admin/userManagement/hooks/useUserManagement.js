import { useState } from "react";

const MOCK_USERS = [
    { id: 1, name: "Dr. Sarah Admin", email: "admin@clinic.com", role: "Admin", status: "Active", createdAt: "2025-01-10", lastLogin: "2026-02-25 14:32" },
    { id: 2, name: "John Pharmacist", email: "pharmacist@clinic.com", role: "Pharmacist", status: "Active", createdAt: "2025-02-14", lastLogin: "2026-02-25 13:15" },
    { id: 3, name: "Lisa Martinez", email: "lisa.martinez@clinic.com", role: "Pharmacist", status: "Active", createdAt: "2025-03-22", lastLogin: "2026-02-24 09:40" },
    { id: 4, name: "Robert Kim", email: "robert.kim@clinic.com", role: "Pharmacist", status: "Inactive", createdAt: "2025-04-05", lastLogin: "2026-01-10 11:00" },
    { id: 5, name: "Priya Nair", email: "priya.nair@clinic.com", role: "Pharmacist", status: "Active", createdAt: "2025-06-18", lastLogin: "2026-02-23 16:55" },
];

export default function useUserManagement() {
    const [users, setUsers] = useState(MOCK_USERS);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null); // { type: "success"|"error", msg }

    const showToast = (type, msg) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 3500);
    };

    // Simulate async — remove fakeDelay and swap with real API calls
    const fakeDelay = (ms = 700) => new Promise((r) => setTimeout(r, ms));

    const addUser = async (data) => {
        setLoading(true);
        await fakeDelay();
        // TODO: const res = await userApi.create(data);
        const newUser = {
            ...data,
            id: Date.now(),
            createdAt: new Date().toISOString().split("T")[0],
            lastLogin: "Never",
        };
        setUsers((prev) => [newUser, ...prev]);
        showToast("success", `User "${data.name}" added successfully.`);
        setLoading(false);
        return true;
    };

    const updateUser = async (id, data) => {
        setLoading(true);
        await fakeDelay();
        // TODO: await userApi.update(id, data);
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
        showToast("success", `User "${data.name}" updated successfully.`);
        setLoading(false);
        return true;
    };

    const deleteUser = async (id) => {
        setLoading(true);
        await fakeDelay();
        // TODO: await userApi.delete(id);
        const name = users.find((u) => u.id === id)?.name;
        setUsers((prev) => prev.filter((u) => u.id !== id));
        showToast("success", `User "${name}" deleted.`);
        setLoading(false);
        return true;
    };

    return { users, loading, toast, showToast, addUser, updateUser, deleteUser };
}