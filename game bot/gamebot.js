import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class GameBot extends TelegramLongPollingBot {

    private final Map<String, String> questions;
    private final Random random;

    public GameBot() {
        questions = new HashMap<>();
        random = new Random();
        // Savollar va javoblar
        questions.put("Qaysi rang ko'k?", "Ko'k");
        questions.put("2+2 nechta?", "4");
        questions.put("Dunyoning poytaxti qaysi?", "Dunyo");
    }

    @Override
    public String getBotUsername(@Games_uzzzbot) {
        return "@Games_uzzzbot";  // Bot username
    }

    @Override
    public String getBotToken(7181763938:AAFMmQg413W1nPJEl15RNuM-YPAOKa1pjkc) {
        return "7181763938:AAFMmQg413W1nPJEl15RNuM-YPAOKa1pjkc";  // Bot token
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String messageText = update.getMessage().getText();
            long chatId = update.getMessage().getChatId();

            SendMessage message = new SendMessage();
            message.setChatId(chatId);

            if (messageText.equalsIgnoreCase("/start")) {
                message.setText("O'yin boshlanmoqda! Savol: " + getRandomQuestion());
            } else {
                if (checkAnswer(messageText)) {
                    message.setText("To'g'ri javob!");
                } else {
                    message.setText("Noto'g'ri javob. Iltimos, yana urinib ko'ring.");
                }
            }

            try {
                execute(message);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        }
    }

    private String getRandomQuestion() {
        Object[] keys = questions.keySet().toArray();
        return (String) keys[random.nextInt(keys.length)];
    }

    private boolean checkAnswer(String answer) {
        return questions.containsValue(answer);
    }

    public static void main(String[] args) {
        try {
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            botsApi.registerBot(new GameBot());
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }
}

