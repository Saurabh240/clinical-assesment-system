import { Trash2, Loader2 } from "lucide-react";

export default function DeleteConfirmModal({ user, onConfirm, onCancel, loading }) {
    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
                <div className="flex flex-col items-center text-center gap-4">

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                        <Trash2 size={24} className="text-red-500" />
                    </div>

                    {/* Text */}
                    <div>
                        <h3 className="text-base font-bold text-gray-800">Delete User</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-gray-700">"{user.name}"</span>?
                            This action cannot be undone.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 w-full mt-1">
                        <button
                            onClick={onCancel}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm
                font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600
                text-white text-sm font-semibold transition-colors disabled:opacity-60
                flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 size={14} className="animate-spin" />}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}