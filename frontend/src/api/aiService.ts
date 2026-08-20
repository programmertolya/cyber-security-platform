import apiClient from './apiClient';

export const getAiHint = async (prompt: string): Promise<string> => {
    try{
        const response = await apiClient.post('/Ai/hint', JSON.stringify(prompt), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data.hint;
    }
    catch(error){
        console.error('Ошибка при запросе к ИИ:', error);
        return 'Не удалось получить ответ от ИИ-помощника';
    }
};
