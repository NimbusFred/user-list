/**
 
Props pro zobrazení RoleTagu
*/
interface RoleTagProps {
    color: string; // Barva pozadí RoleTagu
    text: string; // Text RoleTagu
}

/**
 
Komponenta RoleTag reprezentuje zobrazení role uživatele v seznamu uživatelů
*/
export default function RoleTag({ color, text }: RoleTagProps) {
    return (
        <span className={`px-2 py-1 text-white rounded-md ${color}`}>
            {text}
        </span >
    );
}