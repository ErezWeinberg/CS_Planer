import { useEffect } from 'react';

interface Props {
  onClose: () => void;
}

export default function UserGuideModal({ onClose }: Props) {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const features = [
    {
      icon: '🖱️',
      title: 'חיפוש ושיבוץ קורסים',
      description: 'חפש קורס בסרגל הצידי (או בחלק התחתון במובייל) ופשוט גרור אותו ישירות לסמסטר המבוקש. אפשר גם ללחוץ עליו כדי להוסיף לסמסטר פנוי.',
    },
    {
      icon: '❄️',
      title: 'נעילת סמסטר',
      description: 'לחיצה על פתית השלג בכותרת הסמסטר תנעל אותו ("תקפיא" אותו). קורסים בסמסטר נעול לא יזוזו גם אם תגרור בטעות. מעולה לסמסטרים שכבר סיימת.',
    },
    {
      icon: '⭐',
      title: 'קורס מותאם אישית',
      description: 'לא מוצא קורס מסוים? לחץ על אייקון הכוכב בחיפוש הקורסים וצור קורס משלך (לדוגמה קורסי ספורט, מל"ג, או קורסים מפקולטה אחרת).',
    },
    {
      icon: '🎨',
      title: 'צבעי הנקודות (נק"ז)',
      description: 'שים לב לצבעים ליד הניקוד של כל קורס: כחול = חובה, ירוק = בחירה פקולטית, אפור = בחירה חופשית/מל"ג. זה עוזר להבין את מאזן התואר במבט חטוף.',
    },
    {
      icon: '⇪',
      title: 'שמירה ושיתוף לענן',
      description: 'האתר שומר את ההתקדמות שלך אוטומטית ברגע שאתה מתחבר עם גוגל. לחיצה על "שיתוף/ייבוא" תאפשר לך לשלוח קישור חי לחברים לעבודה משותפת!',
    },
    {
      icon: '📱',
      title: 'חווית מובייל',
      description: 'האתר מותאם לחלוטין לטלפון. בטלפון, השהה את האצבע על קורס לחצי שנייה כדי להתחיל לגרור אותו (כדי שלא תגרור בטעות כשאתה רק גולל למטה).',
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      dir="rtl"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>💡</span> מדריך קצר: איך להשתמש בפלנר
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-2xl leading-none transition-colors"
            aria-label="סגור"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <p className="text-gray-600 dark:text-slate-400 mb-6 text-sm">
            ברוך הבא למתכנן הלימודים! הנה כמה תכונות מפתח שיעזרו לך לתכנן את התואר בצורה המושלמת:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 border border-gray-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl bg-white dark:bg-slate-800 shadow-sm rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-slate-400 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/30 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm cursor-pointer"
          >
            הבנתי, בוא נתחיל!
          </button>
        </div>

      </div>
    </div>
  );
}
