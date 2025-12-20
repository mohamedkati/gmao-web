// // src/features/customers/components/steps/payment-step.tsx

// "use client";

// import { UseFormReturn } from "react-hook-form";
// import { FormCard, FormSection, FormFieldWrapper } from "@/shared/components/forms";
// import { Input } from "@/shared/components/shadcnui/input";
// import { Textarea } from "@/shared/components/shadcnui/textarea";
// import { CreditCard, Info, CheckCircle2 } from "lucide-react";
// import { Alert, AlertDescription } from "@/shared/components/shadcnui/alert";
// import { CustomerFormData } from "../../types/customer.types";

// interface PaymentStepProps {
//   form: UseFormReturn<CustomerFormData>;
// }

// export function PaymentStep({ form }: PaymentStepProps) {
//   const {
//     register,
//     formState: { errors },
//     watch,
//   } = form;

//   const paymentMethodName = watch("paymentMethod.name");
//   const paymentMethodTerms = watch("paymentMethod.terms");

//   return (
//     <div className="space-y-6 animate-in fade-in duration-500">
//       {/* Info paiement */}
//       <Alert className="backdrop-blur-xl bg-blue-500/10 border-blue-500/20">
//         <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//         <AlertDescription className="text-sm">
//           Le moyen de paiement est optionnel. Il permet de spécifier le mode de règlement
//           privilégié par le client (virement, chèque, prélèvement, etc.).
//         </AlertDescription>
//       </Alert>

//       <FormCard
//         title="Moyen de paiement"
//         description="Mode de règlement privilégié"
//         icon={CreditCard}
//         glowColor="primary"
//       >
//         <FormSection
//           title="Informations de paiement"
//           description="Détails du moyen de paiement principal"
//           icon={CreditCard}
//         >
//           <div className="space-y-4">
//             <FormFieldWrapper
//               label="Nom du moyen de paiement"
//               error={errors.paymentMethod?.name?.message}
//               hint="Ex: Virement bancaire, Chèque, Prélèvement automatique"
//               icon={CreditCard}
//             >
//               <Input
//                 placeholder="Ex: Virement bancaire"
//                 {...register("paymentMethod.name")}
//                 className="backdrop-blur-sm"
//               />
//             </FormFieldWrapper>

//             <FormFieldWrapper
//               label="Conditions"
//               error={errors.paymentMethod?.terms?.message}
//               hint="Détails complémentaires (IBAN, références, etc.)"
//             >
//               <Textarea
//                 placeholder="Ex: IBAN: FR76 1234 5678 9012 3456 7890 123"
//                 rows={3}
//                 {...register("paymentMethod.terms")}
//                 className="backdrop-blur-sm resize-none font-mono text-sm"
//               />
//             </FormFieldWrapper>
//           </div>
//         </FormSection>
//       </FormCard>

//       {/* Preview du moyen de paiement */}
//       {paymentMethodName && (
//         <div className="relative group">
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
//           <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border-2 border-primary/30 rounded-xl p-6 animate-in slide-in-from-bottom-4 duration-500">
//             <div className="flex items-start gap-4">
//               <div className="p-3 rounded-xl bg-primary/20">
//                 <CreditCard className="h-6 w-6 text-primary" />
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-2">
//                   <h4 className="font-bold text-lg">{paymentMethodName}</h4>
//                   <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
//                 </div>
//                 {paymentMethodTerms && (
//                   <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
//                     {paymentMethodTerms}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Moyens de paiement suggérés */}
//       <FormCard
//         title="Suggestions"
//         description="Moyens de paiement courants"
//         icon={Info}
//         glowColor="blue"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {[
//             { name: "Virement bancaire", terms: "À fournir : IBAN et BIC" },
//             { name: "Chèque", terms: "À l'ordre de la société" },
//             { name: "Prélèvement automatique", terms: "Mandat SEPA requis" },
//             { name: "Carte bancaire", terms: "Paiement en ligne sécurisé" },
//           ].map((suggestion) => (
//             <button
//               key={suggestion.name}
//               type="button"
//               onClick={() => {
//                 form.setValue("paymentMethod.name", suggestion.name);
//                 form.setValue("paymentMethod.terms", suggestion.terms);
//               }}
//               className="group/item p-4 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 border border-white/20 transition-all text-left"
//             >
//               <div className="flex items-center gap-3">
//                 <CreditCard className="h-5 w-5 text-primary group-hover/item:scale-110 transition-transform" />
//                 <div>
//                   <p className="font-medium text-sm">{suggestion.name}</p>
//                   <p className="text-xs text-muted-foreground">{suggestion.terms}</p>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </FormCard>
//     </div>
//   );
// }

// src/features/customers/components/steps/payment-step.tsx

// "use client";

// import { UseFormReturn } from "react-hook-form";
// import { CustomerFormData } from "../../schemas/customer-form.schema";
// import { FormCard, FormSection } from "@/shared/components/forms";
// import { Input } from "@/shared/components/shadcnui/input";
// import { Textarea } from "@/shared/components/shadcnui/textarea";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
//   FormMessage,
// } from "@/shared/components/shadcnui/form";
// import { CreditCard, Info, CheckCircle2 } from "lucide-react";
// import { Alert, AlertDescription } from "@/shared/components/shadcnui/alert";

// interface PaymentStepProps {
//   form: UseFormReturn<CustomerFormData>;
// }

// export function PaymentStep({ form }: PaymentStepProps) {
//   const paymentMethodName = form.watch("paymentMethod.name");
//   const paymentMethodTerms = form.watch("paymentMethod.terms");

//   return (
//     <div className="space-y-6 animate-in fade-in duration-500">
//       {/* Info paiement */}
//       <Alert className="backdrop-blur-xl bg-blue-500/10 border-blue-500/20">
//         <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//         <AlertDescription className="text-sm">
//           Le moyen de paiement est optionnel. Il permet de spécifier le mode de règlement
//           privilégié par le client (virement, chèque, prélèvement, etc.).
//         </AlertDescription>
//       </Alert>

//       <FormCard
//         title="Moyen de paiement"
//         description="Mode de règlement privilégié"
//         icon={CreditCard}
//         glowColor="primary"
//       >
//         <FormSection
//           title="Informations de paiement"
//           description="Détails du moyen de paiement principal"
//           icon={CreditCard}
//         >
//           <div className="space-y-4">
//             {/* Nom du moyen de paiement */}
//             <FormField
//               control={form.control}
//               name="paymentMethod.name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     <div className="flex items-center gap-2">
//                       <CreditCard className="h-4 w-4 text-muted-foreground" />
//                       Nom du moyen de paiement
//                     </div>
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Ex: Virement bancaire"
//                       {...field}
//                       className="backdrop-blur-sm"
//                     />
//                   </FormControl>
//                   <FormDescription>
//                     Ex: Virement bancaire, Chèque, Prélèvement automatique
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Conditions */}
//             <FormField
//               control={form.control}
//               name="paymentMethod.terms"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Conditions</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Ex: IBAN: FR76 1234 5678 9012 3456 7890 123"
//                       rows={3}
//                       {...field}
//                       className="backdrop-blur-sm resize-none font-mono text-sm"
//                     />
//                   </FormControl>
//                   <FormDescription>
//                     Détails complémentaires (IBAN, références, etc.)
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </FormSection>
//       </FormCard>

//       {/* Preview du moyen de paiement */}
//       {paymentMethodName && (
//         <div className="relative group">
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
//           <div className="relative backdrop-blur-xl bg-gradient-to-br from-background/80 to-background/40 border-2 border-primary/30 rounded-xl p-6 animate-in slide-in-from-bottom-4 duration-500">
//             <div className="flex items-start gap-4">
//               <div className="p-3 rounded-xl bg-primary/20">
//                 <CreditCard className="h-6 w-6 text-primary" />
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-2">
//                   <h4 className="font-bold text-lg">{paymentMethodName}</h4>
//                   <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
//                 </div>
//                 {paymentMethodTerms && (
//                   <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
//                     {paymentMethodTerms}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Moyens de paiement suggérés */}
//       <FormCard
//         title="Suggestions"
//         description="Moyens de paiement courants"
//         icon={Info}
//         glowColor="blue"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {[
//             { name: "Virement bancaire", terms: "À fournir : IBAN et BIC" },
//             { name: "Chèque", terms: "À l'ordre de la société" },
//             { name: "Prélèvement automatique", terms: "Mandat SEPA requis" },
//             { name: "Carte bancaire", terms: "Paiement en ligne sécurisé" },
//           ].map((suggestion) => (
//             <button
//               key={suggestion.name}
//               type="button"
//               onClick={() => {
//                 form.setValue("paymentMethod.name", suggestion.name);
//                 form.setValue("paymentMethod.terms", suggestion.terms);
//               }}
//               className="group/item p-4 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 border border-white/20 transition-all text-left"
//             >
//               <div className="flex items-center gap-3">
//                 <CreditCard className="h-5 w-5 text-primary group-hover/item:scale-110 transition-transform" />
//                 <div>
//                   <p className="font-medium text-sm">{suggestion.name}</p>
//                   <p className="text-xs text-muted-foreground">{suggestion.terms}</p>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </FormCard>
//     </div>
//   );
// }