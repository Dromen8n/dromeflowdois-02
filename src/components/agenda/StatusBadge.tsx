
import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles: { [key: string]: string } = {
        "LIVRE": "bg-blue-modern/20 text-blue-modern border-blue-modern/30",
        "LIVRE 6": "bg-blue-modern/30 text-blue-modern border-blue-modern/40",
        "MANHÃ": "bg-yellow-modern/20 text-yellow-800 border-yellow-modern/30",
        "TARDE": "bg-orange-modern/20 text-orange-modern border-orange-modern/30"
    };

    return (
        <Badge
            variant="outline"
            className={`text-xs px-2 py-1 font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}
        >
            {status}
        </Badge>
    );
};
