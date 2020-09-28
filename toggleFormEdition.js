/*
 *   toggleFormEdition(editBtnElement)
 *     ARG:  editBtnElement
 *           type : HTML object
 *
 *    Permet de verrouiller et déverrouiller un formulaire
 *    et donc l'utiliser pour en afficher le contenu existant en lecture seule
 *    en "gommant" l'aspect formulaire.
 *
 *     La fonction cible le form qui contient l'élément passé en argument.
 *     Ainsi les champs activés sont uniquement ceux du formulaire.
 *     ( utile dans le cas où une page en contiendrait plusieurs.)
 *
 *     Permet à l'appel de la fonction d'alterner entre un formulaire actif et éditable
 *     et un formulaire vérouillé en :
 *      - activant/désactivant le paramètre "readonly" des champs d'input
 *      - modifiant la couleur des bordures des champs d'input (transparent/opaque)
 *      - affichant/masquant le bouton de type submit du formulaire
 *      - affichant/masquant un bouton d'annulation des modifications
 *
 *     MISE EN PLACE :
 *     1    Ajouter "readonly" dans les balises d'ouverture des inputs
 *          <input class="..." readonly>
 *     2    Créer deux boutons au sein du formulaire (ils ne sont pas obligatoirement
 *          des descendants directs du formulaire) :
 *             - un bouton annuler avec la classe "revert_btn"
 *             - un bouton modifier avec la classe "edit_btn"
 *     2    Appeler la fonction toggleFormEdition() avec le onclick des deux boutons
 *          et passer l'argument "this" à chaque fois (this étant le bouton qui fait l'appel de fonction).
 *            <button onclick="toggleFormEdition(this)">
 *
 */

function grabParentForm(element) {
  // tant que l'élément n'est pas un <form>, cibler l'élément parent.
  while (element.tagName != "FORM") {
    element = element.parentElement;
  }
  // renvoyer le form parent.
  return element;
}

/*
 *  Affiche ou masque les <input> type='radio' et type='checkbox'
 */
function ToggleFormRadios(formElement, formState) {
  const checkableElements = formElement.querySelectorAll(
    "input[type='radio'],input[type='checkbox']"
  );
  // si le form est en cours d'édition (son data-editable == "true")
  if (formState == "true") {
    checkableElements.forEach((element) => {
      if (!element.checked) {
        // cacher les radio non-sélectionnés et leur label
        element.parentElement.classList.add("d-none");
      } else {
        // cacher tous les radio (dont celui selectionné)
        element.classList.add("d-none");
      }
    });
  } else {
    checkableElements.forEach((element) => {
      if (!element.checked) {
        // cacher les radio non-sélectionnés et leur label
        element.parentElement.classList.remove("d-none");
      } else {
        // cacher tous les radio (dont celui selectionné)
        element.classList.remove("d-none");
      }
    });
  }
}

/*
 *  Active ou désactive les <input> et leur <label> en leur appliquant un style
 */
function ToggleFormFields(formElement, formState) {
  // sélectionner tous les inputs du formulaire
  const formFields = formElement.querySelectorAll("input");
  const formFieldsLabels = formElement.querySelectorAll("label");
  // si le form est en cours d'édition (son data-editable == "true")
  if (formState == "true") {
    // mettre à jour les inputs fields
    formFields.forEach((inputElement) => {
      // verrouiller les input
      inputElement.setAttribute("disabled", "disabled");
      // masquer la bordure des input et corriger l'alignement
      inputElement.style.borderColor = "transparent";
      inputElement.style.paddingLeft = "0px";
    });
    // mettre à jour les labels des labels des inputs fields
    formFieldsLabels.forEach((labelElement) => {
      labelElement.classList.add("mb-0");
    });
  } else {
    // mettre à jour les inputs fields
    formFields.forEach((inputElement) => {
      // rendre les input fields editables
      inputElement.removeAttribute("disabled");
      // dessiner la bordure des input et restaurer l'alignement
      inputElement.style.borderColor = "var(--color-if-disabled25)";
      inputElement.style.paddingLeft = ".5rem";
    });
    // mettre à jour le style des labels des inputs fields
    formFieldsLabels.forEach((labelElement) => {
      labelElement.classList.remove("mb-0");
    });
  }
}

function toggleFormButtons(formElement, formState) {
  // sélectionner les boutons du form
  const editBtnElement = formElement.querySelector(".edit_btn");
  const revertBtnElement = formElement.querySelector(".revert_btn");
  const submitBtnElement = formElement.querySelector(`[type="submit"]`);
  // si le form est en cours d'édition (son data-editable == "true")
  if (formState == "true") {
    // afficher le bouton d'édition
    editBtnElement.classList.remove("d-none");
    // cacher le bouton d'annulation des modifications
    revertBtnElement.classList.add("d-none");
    // cacher le bouton de validation du formulaire
    submitBtnElement.classList.add("d-none");
  } else {
    // cacher le bouton d'édition
    editBtnElement.classList.add("d-none");
    // afficher le bouton d'annulation des modifications
    revertBtnElement.classList.remove("d-none");
    // afficher le bouton de validation du formulaire
    submitBtnElement.classList.remove("d-none");
  }
}

function toggleFormEdition(btnElement) {
  // sélectionner le form dont dépend l'élément passé en argument
  const formElement = grabParentForm(btnElement);
  // obtenir l'état du form
  const formState = formElement.dataset.editable;
  // modifier les inputs
  ToggleFormFields(formElement, formState);
  // modifier les radio buttons
  ToggleFormRadios(formElement, formState);
  // modifier les buttons
  toggleFormButtons(formElement, formState);
  // TODO : invoquer une alert
  //showFormAlert(btnElement);

  // modifier l'état du form déclaré dans le DOM (son attibut data-editable)
  //formState = formState == "true" ? "false" : "true";
  if (formState == "true") {
    formElement.dataset.editable = "false";
  } else {
    formElement.dataset.editable = "true";
  }
}
