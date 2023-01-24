import { firebaseFirestore } from "@/firebase";
import { doc, collection } from "firebase/firestore";

// The default cache size threshold is 40 MB. Configure "cacheSizeBytes"
// for a different threshold (minimum 1 MB) or set to "CACHE_SIZE_UNLIMITED"
// to disable clean-up.
const db = collection(firebaseFirestore, "tenant");

let currentTenantId = '';

export function setTenantId(tenantId) {
    currentTenantId = tenantId
}

export function getDatabaseRef() {
    return doc(db, currentTenantId)
}