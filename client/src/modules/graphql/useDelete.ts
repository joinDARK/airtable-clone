import { gql, useMutation } from "@apollo/client";
import { ITableNames } from "../../shared/types"
import { toast } from "react-toastify"
import mutationConfig from "./mutationConfig";

export default function useDelete(table: ITableNames | undefined, id?: number) {
    const mutation = mutationConfig.delete[table]
    const [ deleteRow ] = useMutation(gql`mutation { ${mutation(id)} }`)

    const deleteData = async () => {
        console.log(table, id)
        if (typeof table === "undefined") {
            return toast.error("Ошибка при удалении! Таблица или ID не переданы.")
        }

        try {
            const { data } = await deleteRow()

            if (data?.deleteRow?.success) {
                return toast.success("Данные удалены успешно!")
            } else {
                throw new Error(data?.deleteRow?.message || "Произошла непридвиденная ошибка")
            }
        } catch(e) {
            return toast.error(e?.message || "Ошибка удаления?")
        }
    }

    return { deleteData };
}